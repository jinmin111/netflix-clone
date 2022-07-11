import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath } from "../utils";

const SliderDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: -100px;
`;
const SliderTitle = styled.h1``;
const SliderContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-between;
  position: relative;
`;
const SliderRow = styled(motion.div)`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  position: absolute;
`;
const SliderBox = styled(motion.div)<{ $bgPhoto: string }>`
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  border-radius: 8px;
  height: 200px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const SliderBtn = styled.button`
  width: 60px;
  height: 100%;
  background-color: black;
  color: white;
  font-size: 25px;
  z-index: 2;
`;
const BoxTitle = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
  border-radius: 0 0 8px 8px;
`;
const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const boxTitleVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
interface ISliderProps {
  title: string | undefined;
  data: IMovie[] | undefined;
}
const offset = 6;
function Slider({ title, data }: ISliderProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [increase, setIncrease] = useState(false);
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      setIncrease(false);
    }
  };
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      setIncrease(true);
    }
  };
  const toggleLeaving = () => {
    console.log(leaving);
    setLeaving((prev) => !prev);
  };
  return (
    <SliderDiv>
      <SliderTitle>{title}</SliderTitle>
      <SliderContainer>
        <SliderBtn onClick={decreaseIndex}>{"<"}</SliderBtn>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <SliderRow
            variants={rowVariants}
            initial={increase ? "exit" : "hidden"}
            animate="visible"
            exit={increase ? "hidden" : "exit"}
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            <>
              {data
                ?.slice(offset * index, offset * index + offset)
                .map((movie) => (
                  <SliderBox
                    key={movie.id}
                    $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween" }}
                  >
                    <BoxTitle variants={boxTitleVariants}>
                      <h4>{movie.title}</h4>
                    </BoxTitle>
                  </SliderBox>
                ))}
            </>
          </SliderRow>
        </AnimatePresence>
        <SliderBtn onClick={increaseIndex}>{">"}</SliderBtn>
      </SliderContainer>
    </SliderDiv>
  );
}
export default Slider;
