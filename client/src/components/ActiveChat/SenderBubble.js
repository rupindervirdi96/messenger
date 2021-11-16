import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import { theme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: ({ imageCount }) =>
      imageCount === 1 || !imageCount ? "column" : "column-reverse",
    margin: theme.spacing(4, 0),
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    margin: theme.spacing(1, 2),
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    margin: ({ imageCount }) => (imageCount === 1 ? "0px 5px 0px 5px " : "5px"),
    fontWeight: "bold",
    background: "#F4F6FA",
    borderRadius: ({ imageCount }) =>
      imageCount === 1 ? "0px 0px 0px 10px" : "10px 10px 0 10px",
  },
  bubble: {
    justifyContent: "right",
    borderRadius: "10px 10px 0 10px",
    display: "flex",
    flexDirection: ({ imageCount }) =>
      imageCount <= 1 ? "column-reverse" : "column",
    alignItems: ({ imageCount }) => (imageCount === 1 ? "" : "flex-end"),
  },

  attachmentContainer: {
    display: "flex",
    flexWrap: "wrap",
    maxWidth: "510px",
  },
  attachment: {
    width: ({ imageCount }) => (imageCount === 1 ? "180px" : "160px"),
    height: ({ imageCount }) => (imageCount === 1 ? "150px" : "130px"),
    objectFit: "cover",
    margin: ({ imageCount }) => (imageCount === 1 ? "5px 5px 0px 5px " : "5px"),

    borderRadius: ({ imageCount, text }) =>
      imageCount === 1 && text ? "10px 10px 0px 0px" : "10px 10px 0 10px",
  },
  multipleAttachments: {},
}));

const SenderBubble = (props) => {
  const { time, text, attachments } = props;
  const classes = useStyles({ theme, text, imageCount: attachments?.length });
  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        {text && <Typography className={classes.text}>{text}</Typography>}
        {attachments?.length !== 0 && (
          <Box className={classes.attachmentContainer}>
            {attachments?.map((image, key) => (
              <img
                key={key}
                className={classes.attachment}
                src={image}
                alt="Attachment not found"
              />
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SenderBubble;
