import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlayingMovies, IGetMoviesResult } from "../api";
import Banner from "../Components/Banner";
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
const isLoading = false;
function Home() {
  const { data: nowPlayingData, isLoading: nowPlayingLoading } =
    useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getNowPlayingMovies);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            imgPath={makeImagePath(
              nowPlayingData?.results[0].backdrop_path || ""
            )}
            title={nowPlayingData?.results[0].title}
            overview={nowPlayingData?.results[0].overview}
          ></Banner>
        </>
      )}
    </Wrapper>
  );
}
export default Home;
