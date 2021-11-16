import React, { useState } from "react";
import {
  FormControl,
  FilledInput,
  InputAdornment,
  Button,
  Typography,
} from "@material-ui/core";
import { AttachFile, Mood, Send } from "@mui/icons-material";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import axios from "axios";
import { theme } from "../../themes/theme";

const useStyles = makeStyles((theme) => ({
  root: {
    justifySelf: "flex-end",
    marginTop: theme.spacing(3),
  },
  formControl: {
    marginBottom: theme.spacing(4),
    backgroundColor: "#EEE",
    borderRadius: 8,
  },
  input: {
    backgroundColor: "transparent",
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  fileSelectCount: {
    backgroundColor: "transparent",
    color: "#BBBBBB",
  },
  buttonIcons: {
    height: "50px",
    width: "50px",
  },
  btnSvg: {
    color: "#BBBBBB",
  },
}));

const URL = process.env.REACT_APP_CLOUDINARY_URL;

const Input = (props) => {
  const [imagesSelected, setImagesSelected] = useState([]);
  const classes = useStyles(theme);
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleFileChange = (event) => {
    setImagesSelected(Array.from(event.target.files));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    if (text || imagesSelected.length !== 0) {
      const images = await uploadFiles();
      const reqBody = {
        text,
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user,
      };
      if (images?.length > 0) {
        reqBody.attachments = images;
      }
      await postMessage(reqBody);
      setText("");
      setImagesSelected([]);
    } else {
      alert("No text or attachments.");
    }
  };

  const uploadFiles = async () => {
    const imageArray = imagesSelected?.map((file) => {
      let formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "mevfdfu3");
      return axios.create().post(URL, formData);
    });
    const imagesRes = await Promise.all(imageArray);
    const allImages = imagesRes.map(({ data }) => {
      return data.url;
    });
    return allImages;
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl className={classes.formControl} fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <InputAdornment position="end">
              {imagesSelected.length !== 0 && (
                <Typography className={classes.fileSelectCount}>
                  {imagesSelected.length} files selected
                </Typography>
              )}
              <Button
                variant="text"
                className={classes.buttonIcons}
                component="label"
              >
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e)}
                  hidden
                />
                <AttachFile className={classes.btnSvg} />
              </Button>
              <Button
                variant="standard"
                className={classes.buttonIcons}
                component="label"
              >
                <Mood className={classes.btnSvg} />
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                className={classes.buttonIcons}
                variant="standard"
                component="label"
              >
                <Send className={classes.btnSvg} />
              </Button>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
