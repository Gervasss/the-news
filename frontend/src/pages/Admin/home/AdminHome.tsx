import { IoIosStats } from "react-icons/io";
import {  AiOutlineSearch, } from 'react-icons/ai';
import { AdminPageContainer} from '../../../components/AdminPageContainer';
import { BsGraphUpArrow } from "react-icons/bs";
import { ShowCard } from './Showcard';
import { TopContainer } from './styles';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { SidebarComponent } from '../../../components/sidebar/index' ;
import { BsPersonSquare } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { HiTrophy } from "react-icons/hi2";
import { MdOutlineInventory } from "react-icons/md";
import { MdOutlineEventAvailable } from "react-icons/md";
import { TbReport } from 'react-icons/tb';
import { FaThumbsUp } from "react-icons/fa";

export function AdminHome() {

  const navigate = useNavigate();
 


  





  return (
    
    <AdminPageContainer className='admin' padding="0px"   >
     
     <div style={{height:"90%",width:"94.8%",marginTop:"10px",marginLeft:"10px"}}>
        <SidebarComponent  />
        </div>
      <TopContainer>
      <div className="right">
          <div className="search">
            <input type="text" placeholder="Pesquise aqui.." />
            <AiOutlineSearch /> 
          </div>
        </div>
      </TopContainer>
      
     

      <div className='dash' >
        
                                  
        <ShowCard title="Visão Geral"  icon={<BsGraphUpArrow onClick={() => navigate('/admin/visaogeral')} style={{ cursor: "pointer" }} />} />
        <ShowCard title="Ranking "  icon={<HiTrophy  onClick={() => navigate('')} style={{ cursor: "pointer" }} />} />
        <ShowCard title="Estatística"  icon={<IoIosStats onClick={() => navigate('')} style={{ cursor: "pointer" }} />} />
        <ShowCard title="Engajamento"  icon={<FaThumbsUp   onClick={() => navigate('')} style={{ cursor: "pointer" }} />} />
          
      
        
        
       
      </div>

      
    </AdminPageContainer>
  );
}
