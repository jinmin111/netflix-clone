import styled from "styled-components";

const BannerContainer = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  padding: 60px;
`;
const BannerTitle = styled.div`
  font-size: 55px;
  width: 40%;
  margin-bottom: 30px;
`;
const BannerOverview = styled.div`
  width: 50%;
  font-size: 20px;
`;
interface IBannerProps {
  imgPath: string;
  title: string | undefined;
  overview: string | undefined;
}

function Banner({ imgPath, title, overview }: IBannerProps) {
  return (
    <BannerContainer bgPhoto={imgPath}>
      <BannerTitle>{title}</BannerTitle>
      <BannerOverview>{overview}</BannerOverview>
    </BannerContainer>
  );
}

export default Banner;
