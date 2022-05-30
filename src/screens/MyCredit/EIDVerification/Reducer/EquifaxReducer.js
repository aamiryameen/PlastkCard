import { ACCEPT_EQUIFAX_DISCLAIMER, CREDIT_FILE_FAILURE, CREDIT_FILE_SUCCESS, EID_ANSWERS_FAILURE, EID_ANSWERS_SUCCESS, EID_QUESTIONS_SUCCESS, EID_QUESTION_FAILURE, EQUIFAX_DISCLAIMER_FAILURE, EQUIFAX_DISCLAIMER_SUCCESS, FETCH_CREDIT_FILE, FETCH_EID_QUESTIONS, isIOS, RESET_EID_VERIFICATION_SCREEN, RESET_EQUIFAX_DISCLAIMER, START_EID_VERIFICATION, SUBMIT_EID_ANSWERS } from "../../../../utils/Constants"


const INITIAL_STATE = {
    isLoading: false,
    answersResponse: '',
    creditFileResponse: '',
    questionsResponse: '',
    questionsList : '',
    equifaxDisclaimerResponse : ''
}


export default function equifaxReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case FETCH_EID_QUESTIONS:
        case START_EID_VERIFICATION:
        case FETCH_CREDIT_FILE:
        case SUBMIT_EID_ANSWERS:
        case ACCEPT_EQUIFAX_DISCLAIMER:

            return {
                ...state,
                isLoading: true
            }

        case EID_QUESTION_FAILURE:
        case EID_QUESTIONS_SUCCESS:

            return {
                ...state,
                isLoading: false,
                questionsResponse: action.response,
                questionsList: action.questionsList === undefined ? [] : isIOS ? action.questionsList : action.questionsList.reverse()
            }

        case EID_ANSWERS_FAILURE:
        case EID_ANSWERS_SUCCESS:

            return {
                ...state,
                isLoading: false,
                answersResponse: action.response
            }

        case CREDIT_FILE_FAILURE:
        case CREDIT_FILE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                creditFileResponse: action.response
            }

        case RESET_EID_VERIFICATION_SCREEN:
            return {
                ...state,
                isLoading: false,
                answersResponse: '',
                questionsList : '',
                equifaxDisclaimerResponse: ''
            }

        case EQUIFAX_DISCLAIMER_SUCCESS:
        case EQUIFAX_DISCLAIMER_FAILURE:
            return {
                ...state,
                isLoading: false,
                equifaxDisclaimerResponse: action.response
            }

        case RESET_EQUIFAX_DISCLAIMER:
            return {
                ...state,
                isLoading: 'false',
                equifaxDisclaimerResponse: ''
            }

        default:
            return state

    }
}