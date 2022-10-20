import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.getElementsByTagName('path')[0]
const ccBgColor02 = document.getElementsByTagName('path')[1]
const ccBrandSvg = document.querySelector('.cc-logo span:nth-child(2) img')
const form = document.querySelector('form')

function handlePreventForm(event){
    event.preventDefault() 
}   
form.addEventListener('submit',(event) => handlePreventForm(event))


function setCardType(type ='default'){
    const colors = {
        visa: ['#436d99', '#2d57f2'],
        mastercard: ["#df6f29", "#c69347"],
        default: ["black", "gray"]
    }
    
    let cardColor
    let ccBrandPath
   
    switch(type){
        case 'visa':
        {
            cardColor = colors.visa
            ccBrandPath = 'cc-visa.svg'
        }
        
        break;

        case 'mastercard' :
        {
            cardColor = colors.mastercard
            ccBrandPath = 'cc-mastercard.svg'
        }
        
        break;

        default:{
            cardColor = colors.default
            ccBrandPath = 'cc-default.svg'
        }
    }

    ccBrandSvg.setAttribute('src',ccBrandPath)
    ccBgColor01.setAttribute('fill', cardColor[0])
    ccBgColor02.setAttribute('fill', cardColor[1])
}

globalThis.setCardType = setCardType


const securityCode = window.document.querySelector('#security-code')

const securityCodeMaskPattern = {
    mask: '0000',
};

const securityCodeMasked = IMask(securityCode, securityCodeMaskPattern);


securityCodeMasked.on("accept",() => {
    updatedSecurityCard(securityCodeMasked.value)
})
function updatedSecurityCard(value){
    const seucurityCodeOnDisplay = document.querySelector('.cc-security .value')
    seucurityCodeOnDisplay.textContent = value.length === 0 ? '123' : value

}



const expirationDate = window.document.querySelector('#expiration-date')


const expirationDatePattern = {
    mask: "MM{/}YY",
    blocks: {
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear() + 10).slice(2)
          },
      
          MM: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
          },
    }
}

const expirationDateMasked = IMask(expirationDate, expirationDatePattern)

expirationDateMasked.on('accept',() => {
    updateExpirationDateMasked(expirationDateMasked.value)
})

function updateExpirationDateMasked(value){
    const expirationDateOnDisplay = document.querySelector('.cc-expiration .value')
    expirationDateOnDisplay.textContent = value.length === 0 ? '00/00' : value

}

const cardNumberInput = document.querySelector('#card-number')



const cardNumberPattern = {
    mask : [
        {
            mask: '0000 0000 0000 0000',
            regex: /^4\d{0,15}/,
            cardType: 'visa',
        },

        {
            mask: '0000 0000 0000 0000',
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: 'mastercard',
        },

        {
            mask: '0000 0000 0000 0000',
            cardType: 'default'
        },
    ],
    dispatch: function (appended, dynamicMasked){
        const cardnumber = (dynamicMasked.value + appended).replace(/\D/g, '')
        

        const CardSelected =  dynamicMasked.compiledMasks.find((card) => {
            return cardnumber.match(card.regex)
        })
       
        return CardSelected
    }
}

const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern)
cardNumberMasked.oninput = () => {
    console.log("i'm achieve here")
}

cardNumberMasked.on('accept',() => {
    const cardType = cardNumberMasked.masked.currentMask.cardType
    setCardType(cardType)
    updateCardNumber(cardNumberMasked.value)
})

function updateCardNumber(value){
    const cardNumberOnDisplay = document.querySelector('.cc-info .cc-number')
    cardNumberOnDisplay.textContent = value.length === 0 ? '0000 0000 0000 0000': value 
}

const CardholderName = document.querySelector('#card-holder')
const CardholderNameOnDisplay = document.querySelector('.cc-holder .value')




CardholderName.oninput = () => {
    const value = CardholderName.value
    if(value.length >= 30){
        CardholderName.value = CardholderNameOnDisplay.textContent
        return
    }
    
    CardholderNameOnDisplay.textContent = value.length === 0 ? value : 'fulano da silva'

}









  

