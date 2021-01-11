import React,{useState,useEffect,useRef} from 'react';
import {ModalBackground,ModalArea} from './ModalStyled';
import MaskedInput from 'react-text-mask';
import {useHistory} from 'react-router-dom';
import useApi from '../../helpers/OLXAPI';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import CloseIcon from '@material-ui/icons/Close';
function Modal(props){
    const filefield = useRef();
    const history = useHistory();
    const api = useApi();
    const [categories,setCategories]=useState([]);
    const [status,setStatus] = useState(props.data.status);
    const [title,setTitle]=useState(props.data.title);
    const [category,setCategory]=useState(props.data.category);
    const [price,setPrice]=useState(props.data.price);
    const [priceNegotiable, setPriceNegotiable]=useState(props.data.priceNegotiable);
    const [desc,setDesc]= useState(props.data.description);
    const [disabled, setDisabled]=useState(false);
    const [error,setError]=useState('');
    
    useEffect(()=>{
        const getCategories = async ()=>{
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    },[])

    const handleModalClick = (e) =>{
        if(e.target.classList.contains('ContainerModal')){
            props.setShow(false);
            console.log('fechar');
        }
          
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        setDisabled(true);
        setError('');
        let errors =[];
        if(!title.trim()){
            errors.push('Sem título');
        }
        if(!category){
            errors.push('Sem categoria');

        }
        if(errors.length === 0){
            const formData = new FormData();
            formData.append('title',title);
            formData.append('status',status);
            formData.append('price',price);
            formData.append('priceNegotiable',priceNegotiable);
            formData.append('description',desc);
            formData.append('category',category);

            if(filefield.current.files.length > 0){
                for(let i=0; i<filefield.current.files.length;i++){
                    formData.append('img',filefield.current.files[i]);
                }
            }
            const json = await api.updateAd(formData,props.data.id);
            if(!json.error){
                history.push(`/ad/${props.data.id}`)
            }else{
                setError(json.error);
            }

        }else{
            setError(errors.join("\n"));
        }
        setDisabled(false);
    }
    const priceMask=createNumberMask({
        prefix:'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol:'.',
        allowDecimal:true,
        decimalSymbol:','
    })
    
    return (
        
        <>
            <ModalBackground active={props.show} className="ContainerModal" onClick={handleModalClick}>
                <ModalArea>
                    <CloseIcon onClick={handleModalClick} style={{cursor:'pointer',color:'red'}}/>
                    <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area-title">Status</div>
                        <div className="area-input">
                            <input required type='checkbox' disabled={disabled} defaultChecked={status} onChange={e=>setStatus(!status)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Título</div>
                        <div className="area-input">
                            <input required type='text' disabled={disabled} value={title} onChange={e=>setTitle(e.target.value)}/>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Categoria</div>
                        <div className="area-input">
                            <select
                                disabled={disabled}
                                required
                                name={category}
                                value={category}
                                onChange={e=>setCategory(e.target.value)}
                            >
                                <option></option>
                                {categories && 
                                        categories.map((item)=>{
                                            return <option key={item._id} value={item.slug}>{item.name}</option>
                                        })
                                }
                            </select>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço</div>
                        <div className="area-input">
                                <MaskedInput
                                    mask={priceMask}
                                    placeholder="R$ "
                                    disabled={disabled || priceNegotiable}
                                    value={price}
                                    onChange={e=>setPrice(e.target.value)}
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Preço Negociável</div>
                        <div className="area-input">
                                <input type="checkbox" 
                                    disabled={disabled}
                                    checked={priceNegotiable}
                                    onChange={e=>setPriceNegotiable(!priceNegotiable)}
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Descrição</div>
                        <div className="area-input">
                                <textarea
                                    disabled={disabled}
                                    value={desc}
                                    onChange={e=>setDesc(e.target.value)}
                                >

                                </textarea>
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title">Imagens(1 ou mais)</div>
                        <div className="area-input">
                                <input type="file"
                                    disabled={disabled}
                                    multiple
                                    ref={filefield}
                                />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area-title"></div>
                        <div className="area-input">
                            <button disabled={disabled}>Atualizar</button>
                        </div>
                    </label>
                </form>
                </ModalArea>
            </ModalBackground>
        
        </>
    );

}
export default Modal;