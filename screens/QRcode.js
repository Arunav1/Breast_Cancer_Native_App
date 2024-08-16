// Frontend/Components/QRCode.js

import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import axios from "axios";

const PatientQRCode = ({ userId }) => {
  const [qrCodeData, setQrCodeData] = useState("");

  useEffect(() => {
    const fetchQRCode = async () => {
      try {
        const response = await axios.get(
          `http://192.168.137.31:3000/generate-qr-code/${userId}`
        );
        setQrCodeData(response.data.qrCodeData);
      } catch (error) {
        console.error("Error fetching QR code", error);
      }
    };

    fetchQRCode();
  }, [userId]);

  return (
    <View style={styles.container}>
      {qrCodeData ? (
        <Image source={{ uri: qrCodeData }} style={styles.qrCode} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
});

export default PatientQRCode;
