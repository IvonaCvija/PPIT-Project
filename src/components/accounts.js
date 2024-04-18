import AccountObjects from './accountObjects';

function Accounts(props) {

    // mapping over accounts state
    return props.myAccounts.map(
        (account) => {
            return <AccountObjects myAccounts={account} key={account._id} reload={() => { props.Reload(); }}></AccountObjects>
        }
    );
}

export default Accounts;