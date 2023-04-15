export const styles = {

  custSumButton: {
    padding: 10,
    fontSize: 20,
    borderRadius: 15,
    borderWidth: 5,
    borderStyle: "solid",
    width: 200,
    marginTop: 40,
    marginLeft: 40,
    textAlign: "center",
  },

  textArea: {
    borderBottomLeftRadius: 15,
    padding: 10,
    fontSize: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 5,
    borderStyle: "solid",
    width: 200,
    marginTop: 40,
    marginLeft: 40,
  },

  openDropDown: {
    borderWidth: 5,
    borderTopWidth: 0,
    padding: 10,
    borderStyle: "solid",
    marginLeft: 40,
    width: 200,
  },

  issueDropDown: {
    borderStyle: "solid",
    borderWidth: 3,
    padding: 2,
    borderRadius: 5,
    marginLeft: 30,
  },

  issueDetail: {
    padding: 10,
    textAlign: "center",
    backgroundColor: "cyan",
    borderRadius: 8,
    margin: 4,
    fontWeight: "bold"
  },

  issueDropCont: (openIssueDropDown) => {
    return {
      padding: 10,
      fontSize: 20,
      borderBottomLeftRadius: !openIssueDropDown ? 15 : 0,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderWidth: 5,
      borderStyle: "solid",
      width: 200,
      marginTop: 40,
      marginLeft: 40,
      display: "flex",
      flexDirection: "row",
    }
  },

  headers: {
    width: 200,
    padding: 6,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 3,
    fontWeight: "bold",
    backgroundColor: "cyan",
    textTransform: "uppercase",
    margin: 100,
    textAlign: "center",
  },

  issueBlock: {
    padding: 6,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 3,
    fontWeight: "bold",
    backgroundColor: "cyan",
    width: 120,
    display: "flex",
  },

  productDropDown: (openProductDropDown) => {
    return {
      borderBottomLeftRadius: !openProductDropDown ? 15 : 0,
      padding: 10,
      fontSize: 20,
      borderTopRightRadius: 15,
      borderTopLeftRadius: 15,
      borderWidth: 5,
      borderStyle: "solid",
      width: 200,
      marginTop: 40,
      marginLeft: 40,
    }
  },

  formCont: {
    borderRadius: 15,
    borderWidth: 5,
    borderStyle: "solid",
    padding: 20,
    margin: 20,
  }
};