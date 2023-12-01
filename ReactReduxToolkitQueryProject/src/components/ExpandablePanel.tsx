import { ReactNode, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type ExpandablePanelProps = {
    header: JSX.Element;
    children?: ReactNode; 
};

function ExpandablePanel({ header,children }: ExpandablePanelProps) {
    const [expandable, setExpandable] = useState(false);

    const handleClick = () => {
        setExpandable(!expandable);
    }

    return (
        <div className='panelDiv'>
            <div className='topAlignment'>
                <div className='topAlignment'>
                    {header}
                </div>
                <div onClick={handleClick}>
                    {expandable ? <KeyboardArrowDownIcon/> : <ChevronLeftIcon/>}
                </div>
            </div>
            {expandable && <div>{children}</div>}
        </div>
    );
}

export default ExpandablePanel;
