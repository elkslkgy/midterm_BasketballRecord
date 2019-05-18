import React from 'react';
export default ({content, change}) => {
	return (
        <tr>
            <th className="title contest_info">日期</th>
            <td>{content}</td>
            <td className="PerGame" rowSpan="2"><button className="btn btn-outline-primary btn-lg" id="0" onClick={change}>第一節</button></td>
            <td className="PerGame" rowSpan="2"><button className="btn btn-outline-primary btn-lg" id="1" onClick={change}>第二節</button></td>
            <td className="PerGame" rowSpan="2"><button className="btn btn-outline-primary btn-lg" id="2" onClick={change}>第三節</button></td>
            <td className="PerGame" rowSpan="2"><button className="btn btn-outline-primary btn-lg" id="3" onClick={change}>第四節</button></td>
        </tr>
        )
	}
	                
