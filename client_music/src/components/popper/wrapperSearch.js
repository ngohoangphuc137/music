const WrapperSearch = ({ children, suggest }) => {
    return (
        <div className="scroll-search w-[440px] max-w-[440px] max-h-[300px] h-auto rounded-b-[20px] overflow-hidden bg-[#34224f] overflow-y-auto" >
                <div className="py-[13px] px-[10px]">
                    <div>
                        {suggest}
                        {children}
                    </div>
                </div>
        </div>
    )
}
export default WrapperSearch