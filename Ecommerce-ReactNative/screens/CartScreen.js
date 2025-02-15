import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incementQuantity,
  removeFromCart,
} from "../redux/CartReducer";
import { useNavigation } from "@react-navigation/native";
import ReusableTextField from "../components/ReusableTextField";

const CartScreen = () => {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart);
  const total = Math.ceil(
    cart
      ?.map((item) => item.price * item.quantity)
      .reduce((curr, prev) => curr + prev, 0)
  );

  const dispatch = useDispatch();
  const increaseQuantity = (item) => {
    dispatch(incementQuantity(item));
  };
  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item));
  };
  const deleteItem = (item) => {
    dispatch(removeFromCart(item));
  };
  return (
    <ScrollView style={{ marginTop: 38, flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          backgroundColor: "#E88D67",
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 38,
            flex: 1,
            padding: 4,
          }}
        >
          <AntDesign name="search1" size={24} color="black" />
          <ReusableTextField
            placeholder="Search in ShopKaro.in"
            placeholderTextColor="gray"
          />
        </Pressable>
        <Feather name="mic" size={24} color="black" />
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>₹ {total}</Text>
      </View>
      <Text style={{ marginHorizontal: 10 }}>EMI details Available</Text>
      {cart.length > 0 ? (
        <Pressable
          style={{
            backgroundColor: "#006989",
            padding: 10,
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("Confirm")}
        >
          <Text style={{ color: "white" }}>
            Proceed to Buy ({cart.length}) items
          </Text>
        </Pressable>
      ) : (
        <Text
          style={{
            color: "black",
            textAlign: "center",
            marginHorizontal: 10,
            marginTop: 10,
          }}
        >
          No items in cart
        </Text>
      )}

      <Text
        style={{
          height: 1,
          borderColor: "#D0D0D0",
          borderWidth: 1,
          marginTop: 16,
        }}
      />
      <View>
        {cart?.map((item, index) => (
          <View
            key={index}
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              borderBottomColor: "#F0F0F0",
              borderWidth: 2,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            }}
          >
            <Pressable
              style={{
                marginVertical: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Image
                  style={{
                    width: 140,
                    height: 140,
                    resizeMode: "contain",
                  }}
                  source={{ uri: item?.image }}
                />
              </View>
              <View style={{ marginRight: 10 }}>
                <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                  {item?.title}
                </Text>
                <Text
                  style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                >
                  ₹ {item?.price}
                </Text>
                <Text style={{ color: "green", marginTop: 4 }}>In Stock</Text>
              </View>
            </Pressable>
            <Pressable
              style={{
                marginBottom: 10,
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                }}
              >
                <Pressable
                  onPress={() => decreaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="minus" size={24} color="black" />
                </Pressable>
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>
                <Pressable
                  onPress={() => increaseQuantity(item)}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopLeftRadius: 6,
                    borderBottomLeftRadius: 6,
                  }}
                >
                  <Feather name="plus" size={24} color="black" />
                </Pressable>
              </View>
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
                onPress={() => deleteItem(item)}
              >
                <Text>Delete</Text>
              </Pressable>
            </Pressable>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                marginBottom: 12,
                marginLeft: 10,
              }}
            >
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>Save For Later</Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: "white",
                  paddingHorizontal: 8,
                  paddingVertical: 10,
                  borderRadius: 5,
                  borderColor: "#C0C0C0",
                  borderWidth: 0.6,
                }}
              >
                <Text>See More Like This</Text>
              </Pressable>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
