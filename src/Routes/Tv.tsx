import { useQuery } from "react-query";
import styled from "styled-components";
import { getOnTheAirTv, IGetMoviesResult } from "../api";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Tv() {
  const { data: onTheAirData, isLoading: onTheAirLoading } =
    useQuery<IGetMoviesResult>(["tvs", "onTheAir"], getOnTheAirTv);
  const isLoading = onTheAirLoading;
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            imgPath={makeImagePath(
              onTheAirData?.results[0].backdrop_path || ""
            )}
            title={onTheAirData?.results[0].title}
            overview={onTheAirData?.results[0].overview}
          ></Banner>
          <Slider
            title="now playing"
            data={onTheAirData?.results.slice(0)}
          ></Slider>
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
