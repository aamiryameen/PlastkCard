import { FETCH_ALL_STATEMENTS, RESET_ALL_STATEMENTS_SCREEN, FETCH_PDF_STATEMENTS, RESET_PDF_STATEMENTS } from "../../../../utils/Constants"

export const fetchAllStatementsDataAction = (durationType) => {
    return {
        type: FETCH_ALL_STATEMENTS,
        durationType: durationType
    }
}

export const resetAllStatementsScreen = () => {

    return {
        type: RESET_ALL_STATEMENTS_SCREEN
    }
}

export const fetchPDFStatementsAction = () => {
    return {
        type: FETCH_PDF_STATEMENTS,
    }
}

export const resetPdfStatements = () => {
    return {
        type: RESET_PDF_STATEMENTS
    }
}


