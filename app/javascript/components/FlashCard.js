import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import htmlToReact from "html-react-parser";

import { markdownToHtml } from "../packs/js/markdown_to_html";

const FlashCard = ({ flashCard, wide, onFlip, flipped }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(!!flipped);

  const onFlipHandler = () => {
    onFlip(!isFlipped);
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    setIsFlipped(!!flipped);
  }, [flipped]);

  const Actions = () => (
    <div style={{ ...styles.actions, ...(isHovered ? {} : styles.hidden) }}>
      <a href={`/flash_cards/${flashCard.id}/edit`} className="mr-2">
        <span className="far fa-edit"></span>
      </a>
      <a
        href={`/flash_cards/${flashCard.id}`}
        data-method="delete"
        data-confirm="Do you really want to delete the selected flash card?"
        rel="nofollow"
        className="text-danger"
      >
        <span className="fas fa-trash"></span>
      </a>
    </div>
  );

  return (
    <div
      style={{
        ...styles.cardContainer,
        ...(wide ? { width: "50%", maxWidth: "50%" } : {})
      }}
      onClick={onFlipHandler}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flippy
        flipDirection="horizontal"
        isFlipped={isFlipped}
        style={styles.card}
      >
        <FrontSide style={{ ...styles.side, ...styles.frontSide }}>
          <Actions />
          <div
            style={{
              ...styles.content,
              ...(wide ? styles.wideContent : {})
            }}
          >
            {htmlToReact(markdownToHtml(flashCard.question))}
          </div>
        </FrontSide>
        <BackSide style={{ ...styles.side, ...styles.backSide }}>
          <Actions />
          <div
            style={{
              ...styles.content,
              ...(wide ? styles.wideContent : {})
            }}
          >
            {flashCard.answer}
          </div>
        </BackSide>
      </Flippy>
    </div>
  );
};

FlashCard.propTypes = {
  flashCard: PropTypes.object,
  wide: PropTypes.bool,
  onFlip: PropTypes.func.isRequired,
  flipped: PropTypes.bool
};

const styles = {
  cardContainer: {
    display: "flex",
    flex: "1 1 22%",
    flexDirection: "column",
    minWidth: "250px",
    width: "22%",
    maxWidth: "22%",
    marginRight: "2%",
    marginBottom: "20px"
  },
  card: {
    display: "flex",
    flex: 1
  },
  side: {
    display: "flex",
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "2px 2px 8px 0px #ccc",
    overflowX: "hidden"
  },
  frontSide: {
    background: "#fff"
  },
  backSide: {
    background: "#ffd"
  },
  content: {
    display: "flex",
    flex: "1",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "5px",
    width: "100%",
    height: "300px",
    overflowY: "auto",
    fontSize: "20px"
  },
  wideContent: {
    height: "60vh",
    maxHeight: "450px"
  },
  actions: {
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "-1rem",
    padding: "10px",
    position: "absolute",
    right: "20px",
    background: "#fff",
    transform: "none",
    boxShadow: "0px 1px 10px 10px #fff"
  },
  hidden: {
    display: "none"
  }
};

export default FlashCard;
