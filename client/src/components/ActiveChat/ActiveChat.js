import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import { Input, Header, Messages } from "./index";
import { connect } from "react-redux";
import { theme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "100px calc(100vh - 100px)",
  },
  chatContainer: {
    margin: theme.spacing(0, 5),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const ActiveChat = (props) => {
  const classes = useStyles(theme);
  const { user } = props;
  const conversation = props.conversation || {};

  return (
    <Box className={classes.root}>
      {conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            <Messages
              messages={conversation.messages}
              otherUser={conversation.otherUser}
              userId={user.id}
            />
            <Input
              otherUser={conversation.otherUser}
              conversationId={conversation.id}
              user={user}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

export default connect(mapStateToProps, null)(ActiveChat);
