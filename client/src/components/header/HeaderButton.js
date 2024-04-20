
function HeaderButton({id = null, children, activeId = null, onClick=null, badgeActive = false }){

    var buttonClassName = "header-button";
 
    if (activeId == id){
        buttonClassName = "header-button-active"
    }

    function onBtnClick(e){
        if (onClick != null) {
            onClick();
        }
    }

    return(
        <div className="header-button-container">
            <div onClick={onBtnClick} className={buttonClassName}>
                {children}
                {(badgeActive) ? <div className="header-button-badge"></div> : ""}
            </div>
        </div>
    );
}


export default HeaderButton;