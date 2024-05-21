import React from "react";

function ListCommnents(props) {
  let {data} = props
  // console.log(data)
  function renderListCmt(){
    if(data.length > 0){
      return data.map((F1, x) =>{
        if(F1.id_comment == 0){
          return(
            <React.Fragment key={x}>
              <li className="media">
                <a className="pull-left" href="#">
                  <img width="50px" className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + F1.image_user } alt="" />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li><i className="fa fa-user" />{F1.name_user}</li>
                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                  </ul>
                  <p>{F1.comment}</p>
                  <a id={F1.id} onClick={replay} className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                </div>
              </li>
              {data.map((F2, y)=>{
                if(F1.id == F2.id_comment){
                  return(
                    <li key={y} index = {y} className="media second-media">
                      <a className="pull-left" href="#">
                        <img width="50px" className="media-object" src={"http://localhost/laravel8/public/upload/user/avatar/" + F2.image_user } alt="" />
                      </a>
                      <div className="media-body">
                        <ul className="sinlge-post-meta">
                          <li><i className="fa fa-user" />{F2.name_user}</li>
                          <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                          <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                        </ul>
                        <p>{F2.comment}</p>
                        <a className="btn btn-primary" href><i className="fa fa-reply" />Replay</a>
                      </div>
                    </li>
                  )
                }
              })}
            </React.Fragment>
          )
        }
      })
    }
  }
  
  function replay(e){
    props.getReplay(e.target.id)
  }

  
  return (
    <div className="response-area">
      <h2>{data.length} RESPONSES</h2>
      <ul className="media-list">
        {renderListCmt()}
        
      </ul>					
    </div>
    
  );
}
  
  export default ListCommnents;
  