import React from 'react';
export default ({content, own, other}) => {
	return (
        <tr>
            <th className="title contest_info">對手</th>
            <td>{content}</td>
            <td className="PerGame" rowSpan="2">{own[0]}:{other[0]}</td>
            <td className="PerGame" rowSpan="2">{own[1]}:{other[1]}</td>
            <td className="PerGame" rowSpan="2">{own[2]}:{other[2]}</td>
            <td className="PerGame" rowSpan="2">{own[3]}:{other[3]}</td>
        </tr>
        )
	}
	                
