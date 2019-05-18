import React from 'react';

export default ({ id, num, name, twoPointMade, twoPointFail, threePointMade, threePointFail, freeThrowMade, freeThrowFail, defensive, offensive, steals, assists, blocks, fouls, turnovers, scores }) => {
     // if (isComplete) {
          return (
               <tr id={id}>
                    <td className="num" rowSpan="2">{num}</td>
                    <td className="name" id={name} rowSpan="2">{name}</td>
                    <td className="twoPointMade" colSpan="2">{twoPointMade}</td>
                    <td className="twoPointFail" colSpan="2">{twoPointFail}</td>
                    <td className="threePointMade" colSpan="2">{threePointMade}</td>
                    <td className="threePointFail" colSpan="2">{threePointFail}</td>
                    <td className="freeThrowMade" colSpan="2">{freeThrowMade}</td>
                    <td className="freeThrowFail" colSpan="2">{freeThrowFail}</td>
                    <td className="defensive" colSpan="2">{defensive}</td>
                    <td className="offensive" colSpan="2">{offensive}</td>
                    <td className="steals" colSpan="2">{steals}</td>
                    <td className="assists" colSpan="2">{assists}</td>
                    <td className="blocks" colSpan="2">{blocks}</td>
                    <td className="fouls" colSpan="2">{fouls}</td>
                    <td className="turnovers" colSpan="2">{turnovers}</td>
                    <td className="scores"rowSpan="2" colSpan="2">{scores}</td>
                </tr>
          )
}
