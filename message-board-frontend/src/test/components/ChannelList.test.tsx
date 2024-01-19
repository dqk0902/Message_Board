import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import { AppContext, AppContextProps, AppProvider} from '../../context/AppContext';
import { useAppContext } from '../../context/AppContext';
import ChannelList from '../../components/ChannelList';

jest.mock('../../context/AppContext');

describe('ChannelList', () => {
  const initalContext: AppContextProps = {
      channels: [{ id: 1, name: 'Channel 1' }, { id: 2, name: 'Channel 2' }],
      selectedChannel: null,
      messages: [],
      selectChannel: jest.fn(),
      submitMessage: jest.fn(),
  }
  it('renders without crashing',async () => {
    render(
        <AppContext.Provider value={initalContext}>
          <ChannelList />
        </AppContext.Provider>
      );
  });

  /* it('renders channels correctly',async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    const channelNames = screen.getAllByRole('listitem').map((item) => item.textContent);
    expect(channelNames).toEqual(['Channel 1', 'Channel 2']);
  });

  it('selects a channel when clicked',async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    fireEvent.click(screen.getByText('Channel 2'));

    // Ensure that the selectChannel function is called with the correct channelId
    const { selectChannel } = useAppContext();
    expect(selectChannel).toHaveBeenCalledWith(2);
  });

  it('updates search term correctly',async () => {
    await act(async () => {
      render(
        <AppProvider>
          <ChannelList />
        </AppProvider>
      );
    });

    const searchInput = screen.getByLabelText('Search channels');

    fireEvent.change(searchInput, { target: { value: 'Channel 2' } });

    expect(searchInput).toHaveValue('Channel 2');
  }); */
});
