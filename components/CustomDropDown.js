import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropDownMenuButton = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: '10 Days', value: 'option1' },
        { label: '1 Month', value: 'option2' },
        { label: '6 Months', value: 'option3' },
        { label: '1 Year', value: 'option4' },
        { label: 'Till Date', value: 'option5' },

    ]);

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder=" Select"
            style={styles.dropDown}
            iconContainerStyle={styles.iconContainerStyle}
            dropDownContainerStyle={styles.dropDownContainer}
            placeholderStyle={{ fontWeight: '500' }}
        />
    );
};
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    dropDown: {
        width: width * 0.28,
        backgroundColor: '#E280AF',
        borderWidth: 0,
        justifyContent: 'center',
        padding: 0,
        margin: 0
    },
    dropDownContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        marginTop: 2,
        position: 'absolute',
        right: 55,
        width: width * 0.30

    },
    iconContainerStyle: {
        // paddingRight: 10
    },
});

export default DropDownMenuButton;
