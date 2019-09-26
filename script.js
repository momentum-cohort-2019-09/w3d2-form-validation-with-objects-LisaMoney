//class Form {
  //  constructor () {
    //    this.field=[]
    // }
    // addField (input) {
       // this.field.push(input)
    // }
// }

class Validation {
    constructor (test, errorMsg) {
        this.test = test
        this.errorMsg = errorMsg || "is invalid"
        // look at this later, Lisa!
    }

    validate (value) {
        return this.test(value)
    }
}

class Field {
    constructor (inputDiv, validations) {
        this.inputDiv = inputDiv
        this.validations = validations || []
    }

    clearErrorMsgs () {
        for (let msg of this.inputDiv.querySelectorAll(".error-msg")) {
            msg.remove()
        }
    }

    addErrorMsgs (errorMsgs) {
        let fieldName = this.inputDiv.querySelectorAll("label").innerText
        for (let msg of errorMgs) {
            const msgNode = document.createElement("p")
            msgNode.classList.add("input-hint", "text=danger", "error-msg")
            msgNode.innerText = `${fieldName} ${msg}.`
            this.inputDiv.appendChild(msgNode)
        }
    }

    markValid () {
        this.clearErrorMsgs()
        this.inputDiv.classList.add("input-valid")
        this.inputDiv.classList.remove("input-invalid")
    }

    markInvalid () {
        this.clearErrorMsgs()
        this.inputDiv.classList.add("input-invalid")
        this.inputDiv.classList.remove("input-valid")
    }

    getValue () {
        const input = this
    }   


}


Lisa 

class Validation {
    constructor (test, errorMsg) { 
        this.test = test
        this.errorMsg = errorMsg || 'is invalid'
    }

    validate (value) {
        return this.test(value)
    }
}

class Field {
    constructor (inputDiv, validations) {
        this.inputDiv = inputDiv
        this.validations = validations || []
    }

    clearErrorMsgs () {
        for (let msg of this.inputDiv.querySelectorAll(`.error-msg`)) {
            msg.remove ()
        }
    }

    addErrorMsgs (errorMsgs) {
        let fieldName = this.inputDiv.querySelector(`label`).innerText
        for (let msg of errorMsgs) {
            const msgNode = document.createElement('p')
            msgNode.classList.add('input-hint', 'text-danger', 'error-msg')
            msgNode.innerText = `${fieldName} ${msg}.`
            this.inputDiv.appendChild(msgNode)
        }
    }

    markValid () {
        this.clearErrorMsgs()
        this.inputDiv.classList.add('input-valid')
        this.inputDiv.classList.remove('input-invalid')
    }

    markInvalid () {
        this.clearErrorMsgs()
        this.inputDiv.classList.add('input-invalid')
        this.inputDiv.classList.remove('input-valid')
    }

    getValue () {
        const input = this.inputDiv.querySelector('input, select, textarea')
        const value = input.value
        return value
    }

    validate () {
        const value = this.getValue()

        const errorMsgs = []
        for (let validation of this.validations) {
            if (!validation.validate(value)) {
                errorMsgs.push(validation.errorMsg)
            }
        }

        if (errorMsgs.length == 0) {
            this.markValid()
        } else {
            this.markInvalid()
            this.addErrorMsgs(errorMsgs)
        }

        return errorMsgs.length === 0
    }
}

class Form {
    constructor (domNode, fields) {
        this.domNode = domNode
        this.fields = fields
    }

    validate () {
        let valid = true

        for (let field of this.fields) {
            const fieldIsValid = field.validate()
            if (!fieldIsValid) {
                valid = false
            }
        }

        return valid 
    }
}

class Todo {
    constructor (text, dueDate, priority) {
        this.text = text
        this.dueDate = dueDate
        this.priority = priority
    }

    toDOMNode () {
        const node = document.createElement('li')
        if (this.priority === '1') {
            node.classList.add('text-secondary')
        } else if (this.priority === '2') {
            node.classList.add('text-primary')
        } else {
            node.classList.add('text-warning', 'text-bold')
        }
        node.innerHTML = `<span>${this.text}</span> ${this.dueDate && `<span>Due on ${this.dueDate}</span>`}`
        return node
    }
}

const presenceValidation = new Validation(value => !!value, 'must not be blank')
const nowOrFutureValidation = new Validation(function (dateStrToTest) {
    if (!dateStrToTest) {
        return true
    }

    let dateToTest = new Date(dateStrToTest)
    let now = new Date()
    now.setUTCHours(0, 0, 0, 0)
    dateToTest.setUTCHours(0, 0, 0, 0)

    return dateToTest >= now
}, 'must be today or in the future')

let todoField = new Field(document.querySelector('#todo-field'), [presenceValidation])
let dueField = new Field(document.querySelector('#due-field'), [presenceValidation, nowOrFutureValidation])
let priorityField = new Field(document.querySelector('#priority-field'))
let form = new Form(document.querySelector('#todo-form'), [todoField, dueField, priorityField])

document.querySelector