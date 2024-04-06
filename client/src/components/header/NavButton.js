
function HeaderNavButton({id = null, activeId = null, name = "Nav Button", onClick = null}){

    function onNavBtnClick(){
        if(onClick != null){
            onClick(id);
        }
    }

    if(activeId != id){
        return (
            <div onClick={onNavBtnClick} className="nav-btn-container">
                <div className="nav-btn-normal">
                    {name}
                    <div className="nav-btn-active-bar"></div>
                </div>
            </div>
        );
    }else{
        return(
            <div onClick={onNavBtnClick} className="nav-btn-container">
                <div className="nav-btn-active">
                    {name}
                    <div className="nav-btn-active-bar"></div>
                </div>
            </div>
        );
    }

   
}

export default HeaderNavButton;