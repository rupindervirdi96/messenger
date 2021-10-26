export const addConversationToStore = (conversations) => {
  return conversations.map((conversation) => {
    const convoCopy = { ...conversation };
    let messages = convoCopy.messages;
    messages.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
    return {
      ...convoCopy,
      messages,
    };
  });
};

export const addMessageToStore = (state, payload) => {
  const { message, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
    };
    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      let messages = [...convoCopy.messages, message];
      let latestMessageText = message.text;
      messages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      return {
        ...convoCopy,
        messages,
        latestMessageText,
      };
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const convoCopy = { ...convo };
      let id = message.conversationId;
      let messages = [...convoCopy.messages, message];
      let latestMessageText = message.text;
      messages.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      return {
        ...convoCopy,
        id,
        messages,
        latestMessageText,
      };
    } else {
      return convo;
    }
  });
};
