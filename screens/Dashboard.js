import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions, Pressable } from 'react-native';

const { width, height } = Dimensions.get('window');

const Dashboard = ({navigation}) => {
    return (
        <View style={styles.container}>
            <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
                <ScrollView style={styles.mainImageContainer} horizontal showsHorizontalScrollIndicator={false}>
                    <Image source={require('./assets/breastImage.png')} style={styles.mainImage} />
                    <Image source={require('./assets/breastImage.png')} style={styles.mainImage} />
                    <Image source={require('./assets/breastImage.png')} style={styles.mainImage} />
                </ScrollView>

                <Pressable style={styles.activityContainer} onPress={() => navigation.navigate('DailyReport')}>
                    {/* <Text style={styles.activityTitle}>Activity</Text> */}
                    <View style={styles.activityItem}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>5th July</Text>
                            <View style={styles.daysContainer}>
                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                <Text key={index} style={styles.dayText}>{day}</Text>
                            ))}
                        </View>
                        </View>
                        
                        <View style={styles.logContainer}>
                            <Text style={styles.logText}>Log Today's Pain</Text>
                            <View style={styles.grayCircle}>
                                <View style={styles.whiteCircle}>
                                    <Image source={require('./assets/heart.png')} style={styles.logIcon} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Pressable>

                <Text style={styles.activityTitle}>Actions</Text>
                <View style={styles.actionsContainer}>
                    <View style={styles.actionWrapper}>
                        <TouchableOpacity style={styles.actionItem}>
                            <Image source={require('./assets/report.png')} style={styles.actionImage} />
                        </TouchableOpacity>
                        <Text style={styles.actionText}>Progress Report</Text>
                    </View>
                    <View style={styles.actionWrapper}>
                        <TouchableOpacity style={styles.actionItem}>
                            <Image source={require('./assets/Search-Medicine.png')} style={styles.actionImage} />
                        </TouchableOpacity>
                        <Text style={styles.actionText}>Search Medicine</Text>
                    </View>
                    <View style={styles.actionWrapper}>
                        <TouchableOpacity style={styles.actionItem}>
                            <Image source={require('./assets/Symptoms.png')} style={styles.actionImage} />
                        </TouchableOpacity>
                        <Text style={styles.actionText}>Others Symptoms</Text>
                    </View>
                    <View style={styles.actionWrapper}>
                        <TouchableOpacity style={styles.actionItem}>
                            <Image source={require('./assets/Health-News.png')} style={styles.actionImage} />
                        </TouchableOpacity>
                        <Text style={styles.actionText}>Health News</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        padding: 10,
        backgroundColor: '#fff',
    },
    mainImageContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        marginTop: 5
    },
    mainImage: {
        width: width * 0.9,
        margin: 5,
        height: height * 0.2,
        borderRadius: 7,
        resizeMode: 'cover',
    },
    activityContainer: {
        marginBottom: 20,
    },
    activityTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    activityItem: {
        height: height * 0.2,
        width: width * 0.9,
        backgroundColor: '#E280AF',
        borderRadius: 15,
        padding: 10,
        margin: 10,
        shadowColor: 'black',
        elevation: 5,
        overflow: 'hidden',
    },
    dateContainer: {
        alignItems: 'flex-start',
        flexDirection:'row'
    },
    dateText: {
        backgroundColor: '#fff',
        padding: 5,
        borderRadius: 5,
        fontSize: 13,
        fontWeight: 'bold',
        marginHorizontal:8
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        // marginVertical: 10,
        gap:8
    },
    dayText: {
        backgroundColor: '#E0E0E0',
        padding: 5,
        borderRadius: 3,
        fontSize: 13,
        paddingHorizontal:10

    },
    logContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    grayCircle: {
        backgroundColor: 'gray',
        borderRadius: 50,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:10

    },
    whiteCircle: {
        backgroundColor: 'white',
        borderRadius: 50,
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
    },
    actionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 110,
    },
    actionWrapper: {
        alignItems: 'center',
        margin: 7,
    },
    actionItem: {
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        marginBottom: 5,
    },
    actionText: {
        fontSize: 12,
    },
    actionImage: {
        height: 43,
        width: 43,
    },
});

export default Dashboard;
