import './Signup.css';
import iconList from '../images/icon-list.svg'
import illustrationDesktop from '../images/illustration-sign-up-desktop.svg'
import illustrationMobile from '../images/illustration-sign-up-mobile.svg'
import iconSuccess from '../images/icon-success.svg'
import { useState, useRef } from 'react';


export default function Signup() {
    const [errorEmail, setErrorEmail] = useState(''); // E-posta geçerliliği ile ilgili hata mesajını tutan state.
    const [isActiveError, setIsActiveError] = useState(false); //Hata mesajının görünürlüğünü kontrol eden state.
    const [showState, setShowState] = useState(false); //Abonelik formu mu, yoksa teşekkür mesajı mı gösterileceğini kontrol eden state.
    const inputRefEmail = useRef(null);

    function isValidEmail(email) {  //Verilen e-posta adresinin geçerli olup olmadığını kontrol eden fonksiyon.
        return /\S+@\S+\.\S+/.test(email);
    }

    const switchToSignup = () => {  //Teşekkür mesajından abonelik formuna geçişi sağlayan fonksiyon.
        setShowState(false);
    }

    const currentEmailValue = () => {  //Şu anda e-posta giriş alanındaki değeri döndüren fonksiyon.
        return inputRefEmail.current.value;
    }

    const submitEmail = (event) => {  //E-posta abonelik formunun gönderilmesini işleyen fonksiyon. Eğer geçerli bir e-posta değilse, hata mesajını görüntüler.
        event.preventDefault();

        if(inputRefEmail.current.value === '' || !isValidEmail(inputRefEmail.current.value)){
            setErrorEmail('Valid email required');
            setIsActiveError(true);
            setShowState(false);
        }
        else {
            setErrorEmail('');
            setIsActiveError(false);
            setShowState(true); 
        }
    }


    
    const thankState = () => {  //Teşekkür mesajını oluşturan fonksiyon.
        return(
            <div className="container-thank">
                <div>
                    <div><img src={iconSuccess}></img></div>
                    <h1>Abone olduğunuz için teşekkür ederiz!</h1>
                    <p>
                        Onay e-postası <span>{currentEmailValue()} adresine gönderildi.</span>. 
                        Lütfen açın ve aboneliğinizi onaylamak için içindeki düğmeye tıklayın.
                    </p>
                </div>
                <button onClick={switchToSignup}>İletiyi Kapat</button>
            </div>
        )
    }
    //Abonelik formunu oluşturan fonksiyon.
    const signupState = () => {
        return(
            <div className="container-signup">
                <div className="side">
                    <h1>Güncel Kalın!</h1>
                    <p>
                        Aylık güncellemeleri alan 60,000'den fazla ürün yöneticisine katılın:
                    </p>
                    <div className="list-box">
                        <div className="single-list">
                            <img src={iconList}></img>
                            <p>Ürün keşfi ve önemli şeyleri inşa etme</p>
                        </div>

                        <div className="single-list">
                            <img src={iconList}></img>
                            <p>Güncellemelerin başarılı olup olmadığını ölçme</p>
                        </div>

                        <div className="single-list">
                            <img src={iconList}></img>
                            <p>Ve çok daha fazlası!</p>
                        </div>

                    </div>
                    <div className="from">
                        <div className="label-box">
                            <div className="label-state" ref={inputRefEmail}>E-posta adresi</div>
                            <div className="error-state">{errorEmail}</div>
                        </div>
                        <input    
                            type="email" 
                            placeholder='email@sirket.com'
                            ref={inputRefEmail}
                            style={{
                                borderColor: isActiveError ? 'hsl(4, 100%, 67%)' : '',
                                backgroundColor: isActiveError ? 'hsla(4, 100%, 67%), 0.2' :'',
                                color: isActiveError ? 'hsl(4, 100%, 67%)' : '',
                            }}
                        />
                        <button onClick={submitEmail}>Abone Ol</button>

                    </div>
                </div>
                <picture className='side'>
                    <source media='(max-width: 950px)' srcSet={illustrationMobile}/>
                    <img src={illustrationDesktop} />
                </picture>
            </div>
        )
    }
    return(
        <div className='main'>
            {showState ? <div>{thankState()}</div> : <div>{signupState()}</div>}
        </div>
    );

}