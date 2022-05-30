// import { theme }  from '../../app.json';
// import LinearGradient from 'react- 
// native-linear-gradient';

const darkTheme = "DAR";
let theme = (darkTheme == 'DARK') ? true : false;
export default global.theme = {
    PRIMARY_COLOR : theme ? "#000" : '',
    FONT_SIZE_SMALL: 12,
    FONT_SIZE_MEDIUM: 14,
    FONT_SIZE_LARGE: 16,
    FONT_WEIGHT_LIGHT: '200',
    FONT_WEIGHT_MEDIUM: '500',
    FONT_WEIGHT_BOLD: '700',
    BACKGROUND_COLOR: theme ? '#454E6F': "#fff" ,
    GRADIENT_FIRST_COLOR: theme ? "#212535" : '#fff',
    GRADIENT_SECOND_COLOR: theme ? "#181E2D" : '#fff',
    LABEL_COLOR: theme ? '#fff' : '#000',
    TEXTINPUT_LABEL_COLOR : theme ? "#fff" : "#8F92A1",
    CONTAINER_PADDING: 20,
    RADIO_TEXT : theme ? "#fff" : "#000",
    BACKGROUND_TERMS : theme ? "#242B3E" : "#fff" ,
    BACK_ARROW_BACKGROUND_COLOR:  theme ? "#404968" : "#fff",
    STATUS_BAR_STYLE: theme ? "light-content" : "dark-content",
    SEGMENTED_BORDER_COLOR: theme ? "#6574A0" : "#DFE1E9",  
    DARK_GRADIENT_FIRST_COLOR: theme ? "#212535" : "#fff",
    DARK_GRADIENT_SECOND_COLOR: theme ? "#181E2D" : "#fff",
    SEGMENTED_ICON_COLOR: theme ? "#fff" : "#000",  
    SEGMENTED_TEXT_COLOR: theme ? "#5D6A93" : "#272D2F",  
    BORDER_WIDTH: theme ? 1 : 0,
    PIN_CODE_BORDER_COLOR: theme ? "#6574A0" : "#DFE1E9",
    PIN_SHARE : theme ? "#5D6A93" : "#272D2F",
    MODAL_BACKGROUND_COLOR: theme ? "#5D6A93" : "#fff",
    RESEND_CODE : theme ? "red" : "#A1C452",
    DROP_DOWN_TEXT_COLOR: theme ? "#000" : "#fff"
};

