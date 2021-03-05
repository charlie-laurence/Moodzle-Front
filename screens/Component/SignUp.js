import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const SignIn = ({ handleLocalPseudo, handleLocalMail, handleLocalPwd }) => {
  const [showPwd, setShowPwd] = useState(false);

  const handleEyePwdPress = () => {
    setShowPwd(!showPwd);
  };

  const updatePseudo = (value) => {
    handleLocalPseudo(value);
  };
  const updateMail = (value) => {
    handleLocalMail(value);
  };
  const updatePwd = (value) => {
    handleLocalPwd(value);
  };

  return (
    <View style={styles.form}>
      <Input
        placeholder="Nom d'utilisateur"
        leftIcon={
          <Ionicons name="person-circle-outline" size={24} color="black" />
        }
        onChangeText={(value) => updatePseudo(value)}
      />
      <Input
        placeholder="Courriel"
        leftIcon={<Ionicons name="mail-outline" size={24} color="black" />}
        onChangeText={(value) => updateMail(value)}
      />
      <Input
        placeholder="Mot de Passe"
        leftIcon={<Ionicons name="ios-key-outline" size={24} color="black" />}
        rightIcon={
          showPwd ? (
            <Ionicons
              name="eye-outline"
              size={24}
              color="black"
              onPress={() => handleEyePwdPress()}
            />
          ) : (
            <Ionicons
              name="eye-off-outline"
              size={24}
              color="black"
              onPress={() => handleEyePwdPress()}
            />
          )
        }
        secureTextEntry={!showPwd}
        onChangeText={(value) => updatePwd(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    width: (Dimensions.get("window").width * 70) / 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignIn;
