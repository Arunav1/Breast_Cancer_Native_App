import { View, Text, StyleSheet, Image, ScrollView, Pressable, } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // or whichever icon set you prefer
import React from 'react';

const Drawer_tab = ({navigation}) => {
    const menuItems = [
        { id: 1, title: "Notifications", image: require("./assets copy/notification_icon.png") , onPress:'Notification'},
        { id: 2, title: "Complete Profile", image: require("./assets copy/pi.png") ,onPress:'CompleteProfile'},
        { id: 4, title: "Appointments", image: require("./assets copy/Appointments.jpeg"), onPress:'DoctorAppointments' },
        { id: 7, title: "Share Symptoms", image: require("./assets copy/share-symptoms.png") ,onPress:'ShareProfile'},
       
    ];

    const menuItems2 = [
        { id: 3, title: "Settings", image: require("./assets copy/settings_icon.jpg") ,onPress:''},
        { id: 4, title: "Privacy Policy", image: require("./assets copy/privacy_icon.jpeg") ,onPress:''},
        { id: 5, title: "Help & Support", image: require("./assets copy/help_icon.jpeg"),onPress:'' },
        { id: 6, title: "About Us", image: require("./assets copy/about_icon.jpeg") ,onPress:''},
    ];

    return (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            <View style={styles.profile_sec}>
                <Image source={require("./assets copy/profile.jpeg")} style={styles.profile_img} />
                <Pressable style={{width:'50%'}} onPress={() => navigation.navigate('profile_delails')}>
                    <Text style={styles.profile_name}>Koushik Samui </Text>
                    <Text>+91 75574893473</Text>

                    <Text style={styles.profile_link} >  
                    view profile  <Image source={require('./assets copy/go-to-the-next-page.jpeg')} style={{height:10,width:10,}}></Image> 
                    </Text>
                </Pressable>
            </View>


            <View style={styles.content_container}>
                {menuItems.map(item => (
                    <Pressable style={styles.content} key={item.id} onPress={() => navigation.navigate(item.onPress)}>
                        <Image source={item.image} style={styles.logos} />
                        <Text style={styles.menu_text}>{item.title}</Text>
                        <Image source={require('./assets copy/go-to-the-next-page.jpeg')} style={{height:15,width:15,}}></Image>
                    </Pressable>
                ))}

            </View>

            <View style={styles.content_container}>
                {menuItems2.map(item => (
                    <Pressable style={styles.content} key={item.id} onPress={() => navigation.navigate(item.onPress)}>
                        <Image source={item.image} style={styles.logos} />
                        <Text style={styles.menu_text}>{item.title}</Text>
                        <Image source={require('./assets copy/go-to-the-next-page.jpeg')} style={{height:15,width:15,}}></Image>
                    </Pressable>
                ))}

            </View>

            <View style={styles.logout_container}>
                <View style={styles.content} >
                    <Image source={require("./assets copy/logout_icon.jpeg")} style={styles.logos} />
                    <Text style={styles.menu_text}>Logout</Text>
                </View>
            </View>

            {/* <View style={styles.logo_container}>
                <Image source={require('./assets copy/logo.png')} style={styles.logo} />
                <Text style={{fontWeight:'300',paddingTop:10}}>v 01.00.00</Text>
            </View> */}
            <View style={styles.social}>
            <Icon name="facebook-square" size={30} color="black" style={styles.social_logo}/>
            <Icon name="twitter" size={30} color="black" style={styles.social_logo}/>
            <Icon name="youtube-play" size={30} color="black" style={styles.social_logo}/>
            <Icon name="telegram" size={30} color="black" style={styles.social_logo}/>
                
            </View>
            
        </ScrollView>
    );
}

export default Drawer_tab;

const styles = StyleSheet.create({
    body: {
        // marginTop: 50,
        paddingHorizontal: 15,
        // backgroundColor: '#48BABC',
        backgroundColor: '#FFD6F6',
        flex: 1,
    },
    profile_img: {
        height: 80,
        width: 80,
        borderRadius: 40,
        borderWidth: 0.5,
        borderColor: 'black',
    },
    profile_sec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 150,
        borderRadius: 10,
        padding: 40,
        elevation: 3,
        marginTop: 20,
        // marginHorizontal: 5,
        overflow:'hidden',
    },
    profile_name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profile_link: {
        color: 'blue',
    },
    content_container: {
        backgroundColor:'white',
        flex: 1,
        borderRadius: 10,
        elevation: 2,
        marginTop: 5,
        // marginHorizontal: 5,
        marginBottom: 5,
        padding: 45,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
    },
    logos: {
        height: 30,
        width: 30,
        backgroundColor: 'white',
        borderRadius: 10,
        marginRight: 20,
    },
    menu_text: {
        fontSize: 17,
        flex: 1,
    },
    menu_arrow: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    logo_container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        height: 150,
        width: 270,
    },
    logout_container: {
        backgroundColor:'white',
        flex: 1,
        borderRadius: 10,
        elevation: 3,
        // marginHorizontal: 5,
        marginBottom: 10,
        paddingLeft: 45,
    },
    social:{
        flexDirection:'row',
        padding:10,
        alignContent:'center',
        textAlign:'center',
        justifyContent:'center'
    },
    social_logo:{
        padding:20,
    }
});
