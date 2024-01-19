import { renderHook, act } from '@testing-library/react';
import { useSocket } from '../../hooks/useSocket';
import { io, Socket } from 'socket.io-client';

jest.mock('socket.io-client');

describe('useSocket', () => {
  it('should initialize socket and clean up on unmount', () => {
    const mockSocket = ({
      on: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
    } as unknown) as Socket;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: Ignore TypeScript warning since we are mocking the implementation
    io.mockReturnValue(mockSocket);

    const { result, unmount } = renderHook(() => useSocket());

    expect(result.current.socket).toBe(mockSocket);
    expect(io).toHaveBeenCalledWith('http://localhost:3001');

    act(() => {
      unmount();
    });

    expect(mockSocket.disconnect).toHaveBeenCalled();
  });
});
