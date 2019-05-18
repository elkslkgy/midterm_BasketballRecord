import React from 'react';
export default ({id, calculate}) => {
	return (
            <tr id={id}>
                <td className="half"><button id="twoPointMade" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="twoPointMade" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="twoPointFail" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="twoPointFail" className="add_minus" onClick={calculate}>+</button></td>                    <td className="half"><button id="threePointMade" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="threePointMade" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="threePointFail" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="threePointFail" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="freeThrowMade" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="freeThrowMade" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="freeThrowFail" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="freeThrowFail" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="defensive" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="defensive" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="offensive" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="offensive" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="steals" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="steals" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="assists" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="assists" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="blocks" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="blocks" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="fouls" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="fouls" className="add_minus" onClick={calculate}>+</button></td>
                <td className="half"><button id="turnovers" className="add_minus" onClick={calculate}>-</button></td>
                <td className="half"><button id="turnovers" className="add_minus" onClick={calculate}>+</button></td>
            </tr>
        )
	}
	                