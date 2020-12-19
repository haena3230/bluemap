const size={
    mobile:"770px",
    tabletS:"1023px",
    tabletM:"1220px",
    tabletL:"1280px",
    laptop:"1460px",
    desktop:"1700px",
};


const theme={
    gray_1:'#f0efeb',
    gray_2:'#E8E8E8',
    blue_1:'#a8dadc',
    blue_2:'#0096c7',
    blue_3:"#023e8a",
    point:"#e63946 ",
    bb_font:{
        fontWeight:'bold',
        fontSize:30,
    },
    b_font:{
        fontWeight:'bold',
        fontSize:17,
    },
    m_font:{
        fontWeight:'bold',
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