const Window = props => {
    return <div class="window">
        <div class="window_header">{props.header}</div>
        <div class="window_content">{props.children}</div>
        <div class="window_footer">{props.footer}</div>
    </div>
}

export default Window