import React, { useEffect } from 'react'
import { View, ScrollView, StyleSheet, Image } from 'react-native'
import HTML from 'react-native-render-html';
import { normalizeFont, normalizeX, normalizeY } from '../../../../utils/Utils';
import Text from '../../../../component/common/Text'
import { useTheme } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';



export default BlogDetailScreen = (props) => {


    const myTheme = useTheme();


    const showResponse = () => {

        let resp = props.route.params.data

        let resp_body = resp.post_body

        let newTag = '<p style="color:' + myTheme.colors.LABEL_COLOR + '; ">'
        resp_body = resp_body.replace(/<p>/g, newTag)

        let disclamerTag = '<p style=\"font-size: 10px; color:' + myTheme.colors.LABEL_COLOR + ';\">'

        resp_body = resp_body.replace(/<p style="font-size: 10px;">/g, disclamerTag)

        let listItemTag = '<li style=color:' + myTheme.colors.LABEL_COLOR + ';\">'

        resp_body = resp_body.replace(/<li>/g, listItemTag)

        let listItemTag1 = '<ol style=color:' + myTheme.colors.LABEL_COLOR + ';\">'

        resp_body = resp_body.replace(/<ol>/g, listItemTag1)

        resp_body = resp_body.replace(/(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^\)]*\)/g, myTheme.colors.LABEL_COLOR)

        resp_body = resp_body.replace(/color: black/g, 'color: ' + myTheme.colors.LABEL_COLOR);

        let tagStyles = { p: { color: myTheme.colors.LABEL_COLOR, marginTop: 5, marginBottom: 5, textAlign: 'justify' }, li: {color: myTheme.colors.LABEL_COLOR} }




        return (
            <LinearGradient colors={[myTheme.colors.DARK_GRADIENT_FIRST_COLOR, myTheme.colors.DARK_GRADIENT_SECOND_COLOR]} style={styles.container}>

                <LinearGradient colors={[myTheme.colors.CARD_GRADIENT_FIRST_COLOR, myTheme.colors.CARD_GRADIENT_SECOND_COLOR]} style={styles.slugStyle}>

                    <ScrollView >

                        <Image source={{ uri: resp.featured_image }} resizeMode='contain' style={{ height: normalizeY(200), width: normalizeX(250) }} />

                        <Text style={[styles.titleStyle, { color: myTheme.colors.LABEL_COLOR, marginBottom: normalizeX(10) }]}>{resp.label}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            <Avatar.Image size={40} source={{ uri: (resp.blog_author.avatar !== '' ? resp.blog_author.avatar : resp.blog_author.gravatar_url) }} />

                            <Text style={[styles.authorStyle, { color: myTheme.colors.LABEL_COLOR }]}>{resp.blog_author.display_name}</Text>


                        </View>


                        <HTML containerStyle={{}} source={{ html: resp_body }} tagsStyles={tagStyles} />


                    </ScrollView>

                </LinearGradient>

            </LinearGradient>
        )

    }

    return (

        <>

            { showResponse()}

        </>
    )

}


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: normalizeFont(20),
        fontWeight: '600'
    },
    container: {
        flex: 1,
    },
    slugStyle: {
        marginHorizontal: normalizeX(20),
        paddingHorizontal: normalizeX(10),
        borderRadius: 10,
    },
    authorStyle: {
        fontSize: normalizeFont(12),
        fontWeight: '600',
        marginLeft: normalizeX(10),
        textAlign: 'center',

    },
})