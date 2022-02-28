import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import styled from "styled-components";
import { mobile, tablet, bigtablet } from "../responsive";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatAmount } from "../utility/formatAmount";
import { getOrders } from "../redux/authRedux";

const Container = styled.div``;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  ${mobile({ fontSize: "14px" })}
`;
const Center = styled.div`
  flex: 1;
  display: flex;
  margin: auto;
  align-items: center;
  justify-content: center;
  ${mobile({ fontSize: "14px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ fontSize: "14px" })}
`;
const FeaturedContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column", justifyContent: "center" })}
`;
const FeaturedItem = styled.div`
  max-width: 320px;
  flex: 1;
  padding: 30px;
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  ${bigtablet({ maxWidth: "230px" })}
  ${tablet({ maxWidth: "220px" })}
  ${mobile({ maxWidth: "400px", margin: "10px 0" })}
`;
const TextContainer = styled.div`
  justify-content: center;
  margin-bottom: 15px;
  align-items: center;
  display: flex;
`;
const Text = styled.h2`
  text-align: center;
  margin-left: 10px;
  font-size: 16px;
`;
const Title = styled.span`
  font-size: 22px;
  ${bigtablet({ fontSize: "20px" })}
  ${tablet({ fontSize: "18px" })}
  ${mobile({ fontSize: "16px" })}
`;
const MoneyContainer = styled.div`
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;
const Money = styled.span`
  font-size: 24px;
  font-weight: 600;
  ${bigtablet({ fontSize: "20px" })}
  ${tablet({ fontSize: "18px" })}
  ${mobile({ fontSize: "16px" })}
`;
const Rate = styled.span`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const Indicator = styled.div`
  font-size: 14px;
  margin-left: 5px;
  color: ${(props) => props.color};
  ${bigtablet({ fontSize: "13px" })}
  ${tablet({ fontSize: "13px" })}
  ${mobile({ fontSize: "12px" })}
`;

const Subtitle = styled.span`
  font-size: 1rem;
  color: gray;
  ${bigtablet({ fontSize: "14px" })}
  ${tablet({ fontSize: "14px" })}
  ${mobile({ fontSize: "12px" })}
`;

const FeaturedInfo = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;

  const lastYearOrders = orders.filter(
    (order) => parseInt(order.createdAt.split("-")[0]) === lastYear
  );
  const currentYearOrders = orders.filter(
    (order) => parseInt(order.createdAt.split("-")[0]) === currentYear
  );

  const totalOrders = orders.length;

  const toShip = orders
    .map((element) => element.status === "To Ship")
    .reduce((a, b) => a + b, 0);

  const delivered = orders
    .map((element) => element.status === "Delivered")
    .reduce((a, b) => a + b, 0);

  const lastYearSales = lastYearOrders
    .map((element) => element.amount)
    .reduce((a, b) => a + b, 0);

  const lastYearIncome = lastYearSales * 0.25; // just to show different percentages
  const lastYearCost = lastYearSales * 0.9; // just to show different percentages

  const currentYearSales = currentYearOrders
    .map((element) => element.amount)
    .reduce((a, b) => a + b, 0);

  const currentYearIncome = currentYearSales * 0.22; // just to show different percentages
  const currentYearCost = currentYearSales * 0.11; // just to show different percentages

  const salesPercent =
    ((currentYearSales - lastYearSales) / lastYearSales) * 100;

  const incomePercent =
    ((currentYearIncome - lastYearIncome) / lastYearIncome) * 100;

  const costPercent = ((currentYearCost - lastYearCost) / lastYearCost) * 100;

  return (
    <Container>
      <TextContainer>
        <Left>
          Total Orders:
          <Text>{totalOrders}</Text>
        </Left>
        <Center>
          To ship:
          <Text> {toShip}</Text>
        </Center>
        <Right>
          Delivered:
          <Text>{delivered}</Text>
        </Right>
      </TextContainer>
      <FeaturedContainer>
        <FeaturedItem>
          <Title>Income</Title>
          <MoneyContainer>
            <Money>{formatAmount(currentYearIncome)}</Money>
            <Rate>
              {Math.floor(incomePercent)}%
              {incomePercent < 0 ? (
                <Indicator color={"#d9534f"}>
                  <TrendingDownOutlinedIcon />
                </Indicator>
              ) : (
                <Indicator color={"#5cb85c"}>
                  <TrendingUpOutlinedIcon />
                </Indicator>
              )}
            </Rate>
          </MoneyContainer>
          <Subtitle>Compared to last year</Subtitle>
        </FeaturedItem>
        <FeaturedItem>
          <Title>Sales</Title>
          <MoneyContainer>
            <Money>{formatAmount(currentYearSales)}</Money>
            <Rate>
              {Math.floor(salesPercent)}%
              {salesPercent < 0 ? (
                <Indicator color={"#d9534f"}>
                  <TrendingDownOutlinedIcon />
                </Indicator>
              ) : (
                <Indicator color={"#5cb85c"}>
                  <TrendingUpOutlinedIcon />
                </Indicator>
              )}
            </Rate>
          </MoneyContainer>
          <Subtitle>Compared to last year</Subtitle>
        </FeaturedItem>
        <FeaturedItem>
          <Title>Cost</Title>
          <MoneyContainer>
            <Money>{formatAmount(currentYearCost)}</Money>
            <Rate>
              {Math.floor(costPercent)}%
              {costPercent < 0 ? (
                <Indicator color={"#d9534f"}>
                  <TrendingDownOutlinedIcon />
                </Indicator>
              ) : (
                <Indicator color={"#5cb85c"}>
                  <TrendingUpOutlinedIcon />
                </Indicator>
              )}
            </Rate>
          </MoneyContainer>
          <Subtitle>Compared to last year</Subtitle>
        </FeaturedItem>
      </FeaturedContainer>
    </Container>
  );
};

export default FeaturedInfo;
