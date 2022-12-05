class ChatsPage{

    chatBox(){
        return cy.get('._1075545d.d42c0c59._773e5144')
    }
    chatTextArea(){
        return cy.get('._9f7eda63')
    }
    sendChatBtn(){
        return cy.get('._362df5b9._2ed5cefa.d93081b2')
    }

}

export default ChatsPage;