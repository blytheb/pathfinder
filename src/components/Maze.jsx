import Cell from './Cell';
import './Maze.css'

function Maze({maze}){
    return (
        <div className="maze">
            {maze.map(row => (
                <div className="row">
                    {row.map(cell => (
                        <Cell type={cell} />
                    ))}
                </div>
            ))}
        </div>
    );

}

export default Maze;