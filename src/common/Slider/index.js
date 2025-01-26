import React, { useRef, useState, useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { BANNER_1 } from "../../helper/image";
import { Screen } from "../../theme/dimens";
import { AppText, INTER_SEMI_BOLD, TWENTY, TWENTY_TWO, WHITE } from "../AppText";
// import Typography from "../../Common/Typography";
// import Font from "../../Common/Font";

const Slider = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const BannerList = [
    {
      id: 1,
      image: BANNER_1,
      title: "High Security",
    },

    {
      id: 2,
      image: BANNER_1,
      title: "High Security",
    },
    {
      id: 3,
      image: BANNER_1,
      title: "High Security",
    },
    {
      id: 4,
      image: BANNER_1,
      title: "High Security",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <ImageBackground
          source={item?.image}
          style={styles.image}
          resizeMode="cover"
        ></ImageBackground>
        <View style={{marginTop: 1, alignItems:"center"}}>
        <AppText color={WHITE} type={TWENTY_TWO} weight={INTER_SEMI_BOLD}>{item?.title}</AppText>
        </View>
      </View>
    );
  };

  useEffect(() => {
    if (ref?.current) {
      ref?.current?.startAutoplay();
    }
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Carousel
        ref={ref}
        data={BannerList}
        renderItem={renderItem}
        sliderWidth={Screen?.Width}
        itemWidth={Screen?.Width}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={2500}
        loop={true}
        onSnapToItem={(index) => {
          setActiveIndex(index);
        }}
      />
      <Pagination
        dotsLength={BannerList.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={[styles.dot, {backgroundColor: "#FFFFFF"}]}
        inactiveDotOpacity={0.5}
        inactiveDotScale={1}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  },
  image: {
    width: 250,
    height: 220,
  },
  paginationContainer: {
    position: "absolute",
    bottom: -20,
    left: 180,
    width: 56,
    // backgroundColor: "red"
  },
  dot: {
    width: 20,
    height: 6,
    // backgroundColor: "#FFFFFF",
  },
  inactiveDot: {
    width: 6,
    height: 6,
  },
  mainContainer: {
    height: 280,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 25
  }
});

export default Slider;