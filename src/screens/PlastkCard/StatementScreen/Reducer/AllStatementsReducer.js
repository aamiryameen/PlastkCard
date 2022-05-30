import {
  ALL_STATEMENTS_FAILURE,
  ALL_STATEMENTS_SUCCESS,
  FETCH_ALL_STATEMENTS,
  RESET_ALL_STATEMENTS_SCREEN,
  FETCH_PDF_STATEMENTS,
  RESET_PDF_STATEMENTS,
  PDF_STATEMENTS_FAILURE,
  PDF_STATEMENTS_SUCCESS,
} from '../../../../utils/Constants';

const INITIAL_STATE = {
  response: '',
  isLoading: false,
  isError: false,
  pdfStatementResponse: '',
};

export default function allStatementsReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_ALL_STATEMENTS:
      return {
        ...state,
        isLoading: true,
      };
    case ALL_STATEMENTS_FAILURE:
    case ALL_STATEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        response: action.response,
      };
    case RESET_ALL_STATEMENTS_SCREEN:
      return {
        ...state,
        isLoading: false,
        response: '',
      };

    case FETCH_ALL_STATEMENTS:
      return {
        ...state,
        isLoading: true,
      };

    case FETCH_PDF_STATEMENTS:
      return {
        ...state,
        isLoading: true,
      };

    case PDF_STATEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        pdfStatementResponse: action.pdfStatementResponse,
      };

    case PDF_STATEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        pdfStatementResponse: action.response,
      };

    case RESET_PDF_STATEMENTS:
      return {
        ...state,
        isLoading: false,
        pdfStatementResponse: '',
      };

    default:
      return state;
  }
}