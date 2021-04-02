import  React from 'react';
import { useState } from 'react'


export function SortableTable ({tablePosts, isLoading}) {

    const useSortableData = (data, config = null) => {

        const [ sortConfig, setSortConfig ] = useState(config);

        const sortedData = React.useMemo(() => {

            let sortableData = [...data];

            if (sortConfig !== null) {
                sortableData.sort((a, b) => {
                    if (a[sortConfig.key] > b[sortConfig.key]) {
                        return sortConfig.direction === 'ascending' ? -1 : 1
                    } else if (a.name > b.name) {
                        return sortConfig.direction === 'ascending' ? 1 : -1
                    }
                    return 0
                });
            }
            return sortableData

        }, [data, sortConfig])

        const requestSort = key => {

            let direction = 'ascending';

            if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
                direction = 'descending';
            }
            setSortConfig({key, direction})
        }
        return { data: sortedData, requestSort }
    }


    const { data, requestSort, sortConfig } = useSortableData(tablePosts)

    const getClassesForName = (name) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    return(

        <div className='container'>
            <table className='sortable-table'>
                <caption className='table-tittle'>Sortable Table</caption>
                <thead>
                <tr>
                    <th>
                        <button className={getClassesForName('id')} type='button' onClick={() => requestSort("id")}>Id</button>
                    </th>
                    <th>
                        <button onClick={() => requestSort("name")}>Name</button>
                    </th>
                    <th>
                        <button onClick={() => requestSort("email")}>E-mail</button>
                    </th>
                    <th>
                        <button onClick={() => requestSort("comment")}>Comment</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {isLoading === false ? data.map(dataItem => (
                    <tr key={dataItem.id}>
                        <td>{dataItem.id}</td>
                        <td>{dataItem.name}</td>
                        <td>{dataItem.email}</td>
                        <td>{dataItem.body}</td>
                    </tr>
                )) : (<h3>Loading...</h3>)}
                </tbody>

            </table>
        </div>
    )
}