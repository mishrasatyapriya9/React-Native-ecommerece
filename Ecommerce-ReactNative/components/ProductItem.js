import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartReducer";

const ProductItem = ({ item, numColumns }) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 10000);
  };
  return (
    <Pressable
      style={{
        marginHorizontal: 20,
        marginVertical: 25,
        width: numColumns === 2 ? "38%" : "90%",
        alignSelf: numColumns === 1 ? "center" : "flex-start",
      }}
    >
      <Image
        style={{
          width: 140,
          height: 140,
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={{ uri: item?.image }}
      />
      <Text numberOfLines={1} style={{ width: 140, marginTop: 10 }}>
        {item?.title}
      </Text>
      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>₹{item?.price}</Text>
        <Text style={{ color: "#005C78", fontWeight: "bold" }}>
          {item?.rating?.rate} ratings
        </Text>
      </View>
      <Pressable
        onPress={() => addItemToCart(item)}
        style={{
          backgroundColor: "#005C78",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        {addedToCart ? (
          <View>
            <Text style={{ color: "white" }}>Added to Cart</Text>
          </View>
        ) : (
          <Text style={{ color: "white" }}>Add to Cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({});
