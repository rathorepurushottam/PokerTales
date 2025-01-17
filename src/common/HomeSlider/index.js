import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Screen } from "../../theme/dimens";
import {
  AppText,
  EIGHTEEN,
  FORTY,
  GOLDEN,
  INTER_BOLD,
  INTER_SEMI_BOLD,
  THIRTY_SIX_L,
  TWENTY,
  TWENTY_FOUR,
  TWENTY_TWO,
  WHITE,
} from "../AppText";

const HomeSlider = () => {
  const ref = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const BannerList = [
    {
      id: 1,
      title: "Practic",
      headline: "DONE!",
      desc: "Time to play some actual Poker",
    },

    {
      id: 2,
      title: "Practic",
      headline: "DONE!",
      desc: "Time to play some actual Poker",
    },
    {
      id: 3,
      title: "Practic",
      headline: "DONE!",
      desc: "Time to play some actual Poker",
    },
    {
      id: 4,
      title: "Practic",
      headline: "DONE!",
      desc: "Time to play some actual Poker",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <AppText color={GOLDEN} type={TWENTY} >
          {item?.title}
        </AppText>
        <AppText color={GOLDEN} type={FORTY} weight={INTER_BOLD} style={{marginTop: 5}}>
          {item?.headline}
        </AppText>
        <AppText color={GOLDEN} type={EIGHTEEN} weight={INTER_SEMI_BOLD} style={{marginTop: 5}}>
          {item?.desc}
        </AppText>
        {/* </View> */}
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
        dotStyle={[styles.dot, { backgroundColor: "#FFFFFF" }]}
        inactiveDotOpacity={0.5}
        inactiveDotScale={1}
        inactiveDotStyle={styles.inactiveDot}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: "space-around",
    alignItems: "center",
    marginRight: 8,
  },
  image: {
    width: 280,
    height: 250,
  },
  paginationContainer: {
    position: "absolute",
    top: 110,
    left: 170,
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
    height: 320,
    alignSelf: "center",
    alignItems: "center",
    marginTop: 25,
    position: "absolute",
    top: 10
  },
});

export default HomeSlider;
