import correct from "../images/confirm_icon.svg";
import incorrect from '../images/unconfirm_icon.svg'

export const InfoTooltip = ({onClose, data}) => {
  return (
    <div className={`popup ${data.isOpen ? "popup_visiable" : null}`}>
      <div className={`popup__content popup__content_info`}>
        <button className={`popup__close page-link`} type="button" onClick={onClose}></button>
        <img className="info-icon" src={data.successful ? correct : incorrect} alt="confirm" />
        <p className="info-text">{data.successful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
      </div>
    </div>
  )
}
