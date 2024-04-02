export default function StatusBox({
    status
} : {
    status: string
}) {
    const setBoxColor = (value: string) => {
        switch (value) {
            case 'Pending':
                return 'bg-ci-yellow text-black';
            case 'Cancelled' || 'Rejected':
                return 'bg-ci-red text-white';
            case 'Archived':
                return 'bg-ci-gray text-black';
            case 'Confirmed':
                return 'bg-ci-green text-black'
        }
    }

    const boxColor = setBoxColor(status)

    return (
        <div>
            <div className={`rounded-lg font-medium small-text text-center py-3 ${boxColor}`}>
                {status}
            </div>
        </div>
    )
}