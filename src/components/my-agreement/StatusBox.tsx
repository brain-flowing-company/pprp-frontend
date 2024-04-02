export default function StatusBox({
    status
} : {
    status: string
}) {
    const setBoxColor = (value: string) => {
        switch (value) {
            case 'Awaiting_deposit':
                return 'bg-ci-yellow text-black';
            case 'Awaiting_rent':
                return 'bg-ci-yellow text-black';
            case 'Overdue':
                return 'bg-ci-red text-white';
            case 'Archive':
                return 'bg-ci-gray text-black';
            case 'Cancelled':
                return 'bg-ci-gray text-black';
            case 'Renting':
                return 'bg-ci-green text-black';
        }
    }

    const boxColor = setBoxColor(status)

    return (
        <div>
            <div className={`rounded-lg font-medium text-2xl text-center py-3 ${boxColor}`}>
                {status}
            </div>
        </div>
    )
}