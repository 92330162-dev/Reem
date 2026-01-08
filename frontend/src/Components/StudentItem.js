const StudentItem = ({full_Name,phone,email,country,language,level}) => {
    return ( 
        <tr>
            <td>{full_Name}</td>
            <td>{phone}</td>
            <td>{email}</td>
            <td>{country}</td>
            <td>{language}</td>
            <td>{level}</td>
            <td>{age}</td>
        </tr>
     );
}
 
export default StudentItem;