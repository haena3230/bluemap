const size={
    mobile:"770px",
    tabletS:"1023px",
    tabletM:"1220px",
    tabletL:"1280px",
    laptop:"1460px",
    desktop:"1700px",
};


const theme={
    gray_1:'#F8F8F8',
    gray_2:'#E8E8E8',
    blue_1:'#3f5fff',
    blue_2:'#3498DB',
    blue_3:"#3f51b5",
    point:"#E74C3C ",
    bb_font:{
        // fontWeight:'bold',
        fontSize:30,
    },
    b_font:{
        // fontWeight:'bold',
        fontSize:17,
    },
    m_font:{
        // fontWeight:'bold',
        fontSize:15,
    },
    m_th_font:{
        fontSize:13,
    },
    s_font:{
        // fontWeight:'bold',
        fontSize:10,
    },
    
    mobile:`(max-width:${size.mobile})`,
    tabletS:`(max-width:${size.tabletS})`,
    tabletM:`(max-width:${size.tabletM})`,
    tabletL:`(max-width:${size.tabletL})`,
    laptop:`(max-width:${size.laptop})`,
    desktop:`(max-width:${size.desktop})`,

}




export default theme;