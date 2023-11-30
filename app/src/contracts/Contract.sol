// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title 객체 사용권 거래 컨트랙트
/// @author Team 'To The Moon'
contract ObjectToken is ERC1155, ERC1155Receiver, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant PERCENTAGE = 5;

    struct Object {
        string name;
        string description;
        string usageRights;
        string objectUrl;
        string imageUrl;
        uint256 supply;
        uint256 priceInWei;
        bool isForSale;
    }

    mapping(uint256 => Object) public objects;
    mapping(uint256 => uint256) public tokenPrice;
    mapping(uint256 => address) public tokenSeller;

    event ObjectCreated(
        uint256 indexed objectId,
        string name,
        address indexed creator
    );
    event TokenPurchased(
        uint256 tokenId,
        address buyer,
        address seller,
        uint256 price
    );
    event Withdrawal(address indexed owner, uint256 amount);

    constructor() ERC1155("") Ownable(msg.sender) {}

    /// @notice 객체를 생성한다.(send 함수)
    /// @param name 객체 이름 string.
    /// @param description 객체 설명 string.
    /// @param usageRights 객체 사용 권한 설명 string.
    /// @param objectUrl 객체 링크 string.
    /// @param supply 객체 배포 개수 uint.
    /// @param priceInWei 객체 1개 당 가격 uint.
    /// @return newObjectId 객체 식별자 값인 uint.
    function createObject(
        string memory name,
        string memory description,
        string memory usageRights,
        string memory objectUrl,
        string memory imageUrl,
        uint256 supply,
        uint256 priceInWei
    ) public payable returns (uint256) {
        require(supply >= 1, "Supply must be at least 1");

        uint256 totalCost = supply * priceInWei;
        uint256 fee = (totalCost * PERCENTAGE) / 100;

        require(msg.value == fee, "Insufficient payment");

        _tokenIds.increment();
        uint256 newObjectId = _tokenIds.current();
        objects[newObjectId] = Object(
            name,
            description,
            usageRights,
            objectUrl,
            imageUrl,
            supply,
            priceInWei,
            true
        );
        _mint(msg.sender, newObjectId, 1, "");

        if (supply > 1) {
            _mint(address(this), newObjectId, supply - 1, "");
        }
        tokenPrice[newObjectId] = priceInWei;
        tokenSeller[newObjectId] = msg.sender;

        // payable(address(this)).transfer(msg.value);

        emit ObjectCreated(newObjectId, name, msg.sender);
        return newObjectId;
    }

    /// @notice 객체를 구매합니다.(send 함수)
    /// @param tokenId 객체 식별자. 타입은 uint.
    function buyToken(uint256 tokenId) public payable {
        require(msg.value == tokenPrice[tokenId], "Incorrect price");
        // require(balanceOf(tokenSeller[tokenId], tokenId) > 0, "No tokens available for sale");
        require(
            isTokenForSale(tokenId) == true,
            "No tokens available for sale"
        );
        require(
            balanceOf(address(this), tokenId) > 0,
            "No tokens available for sale"
        );

        uint256 sellerShare = (msg.value * 95) / 100;
        uint256 contractShare = msg.value - sellerShare;

        // _safeTransferFrom(tokenSeller[tokenId], msg.sender, tokenId, 1, "");
        _safeTransferFrom(address(this), msg.sender, tokenId, 1, "");
        payable(tokenSeller[tokenId]).transfer(sellerShare);

        if (balanceOf(address(this), tokenId) == 0) {
            objects[tokenId].isForSale = false;
        }

        emit TokenPurchased(
            tokenId,
            msg.sender,
            tokenSeller[tokenId],
            msg.value
        );
    }

    /// @notice 미사용 함수.
    function listTokenOnMarket(uint256 tokenId, uint256 price) public {
        require(
            balanceOf(msg.sender, tokenId) > 0,
            "You must own the token to list it"
        );
        tokenPrice[tokenId] = price;
        tokenSeller[tokenId] = msg.sender;
    }

    /// @notice 객체 1개의 정보를 얻어온다.(call 함수)
    /// @param tokenId 객체 식별자 uint.
    /// @return Object 객체의 상세 정보를 담고 있는 구조체(json)입니다.
    function getObjectInfo(
        uint256 tokenId
    ) public view returns (Object memory) {
        return objects[tokenId];
    }

    /// @notice 사용자가 소유한 모든 토큰의 ID를 배열로 반환합니다.(call 함수)
    /// @param user 토큰 ID를 조회할 사용자의 주소입니다.
    /// @return ownedTokens 사용자가 소유한 토큰 ID 배열입니다.
    function getUserTokens(
        address user
    ) public view returns (uint256[] memory) {
        uint256 tokenCount = _tokenIds.current();
        uint256[] memory userTokens = new uint256[](tokenCount);
        uint256 userIndex = 0;

        for (uint256 i = 1; i <= tokenCount; i++) {
            if (balanceOf(user, i) > 0) {
                userTokens[userIndex] = i;
                userIndex++;
            }
        }

        uint256[] memory ownedTokens = new uint256[](userIndex);
        for (uint256 j = 0; j < userIndex; j++) {
            ownedTokens[j] = userTokens[j];
        }
        return ownedTokens;
    }

    // function getUserObjects(address user) public view returns (uint256[] memory) {
    //     uint256 tokenCount = _tokenIds.current();
    //     uint256[] memory userTokens = new uint256[](tokenCount);
    //     uint256 userIndex = 0;
    //     for (uint256 i = 0; i < tokenCount; i++) {
    //         if (balanceOf(user, i) > 0) {
    //             userTokens[userIndex] = i;
    //             userIndex++;
    //         }
    //     }
    //     return userTokens;
    // }

    /// @notice 판매 중인 토큰의 ID를 확인합니다.(call 함수)
    /// @param tokenId 확인할 토큰의 식별자입니다.
    /// @return 판매 중이면 true, 그렇지 않으면 false를 반환합니다.
    function isTokenForSale(uint256 tokenId) public view returns (bool) {
        return objects[tokenId].isForSale;
    }

    /// @notice 현재 판매 중인 모든 토큰의 ID를 배열로 반환합니다.(call 함수)
    /// @return forSaleTokens 판매 중인 토큰의 ID 배열입니다. uint 배열
    function getTokensForSale() public view returns (uint256[] memory) {
        uint256 tokenCount = _tokenIds.current();
        uint256[] memory tokensForSale = new uint256[](tokenCount);
        uint256 saleIndex = 0;

        for (uint256 i = 1; i <= tokenCount; i++) {
            if (objects[i].isForSale) {
                tokensForSale[saleIndex] = i;
                saleIndex++;
            }
        }
        uint256[] memory forSaleTokens = new uint256[](saleIndex);
        for (uint256 j = 0; j < saleIndex; j++) {
            forSaleTokens[j] = tokensForSale[j];
        }

        return forSaleTokens;
    }

    /// @notice 이미 판매된 토큰의 ID를 배열로 반환합니다.(call 함수)
    /// @return finalizedTokens 판매가 완료된 토큰의 ID 배열입니다. uint 배열
    function getSoldTokens() public view returns (uint256[] memory) {
        uint256 tokenCount = _tokenIds.current();
        uint256[] memory soldTokens = new uint256[](tokenCount);
        uint256 soldIndex = 0;

        for (uint256 i = 1; i <= tokenCount; i++) {
            if (!objects[i].isForSale) {
                soldTokens[soldIndex] = i;
                soldIndex++;
            }
        }
        uint256[] memory finalizedTokens = new uint256[](soldIndex);
        for (uint256 j = 0; j < soldIndex; j++) {
            finalizedTokens[j] = soldTokens[j];
        }

        return finalizedTokens;
    }

    /// @notice 주어진 사용자가 특정 토큰을 소유하고 있는지 확인합니다.(call 함수)
    /// @param user 확인할 사용자의 주소입니다. address
    /// @param tokenId 확인할 토큰의 식별자입니다.
    /// @return 소유하고 있으면 true, 그렇지 않으면 false를 반환합니다.
    function checkTokenOwnership(
        address user,
        uint256 tokenId
    ) public view returns (bool) {
        return balanceOf(user, tokenId) > 0;
    }

    /// @notice 컨트랙트의 현재 잔액을 조회합니다.(call 함수)
    /// @return 잔액을 wei 단위로 반환합니다.
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /// @notice 컨트랙트 소유자가 컨트랙트의 잔액을 인출합니다.(send 함수)
    /// @dev 이 함수는 onlyOwner 한정자를 사용하여 컨트랙트 소유자만 호출할 수 있습니다.
    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
        emit Withdrawal(owner(), balance);
    }

    // related to ERC1155Receiver
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 value,
        bytes calldata data
    ) public override returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata values,
        bytes calldata data
    ) public override returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, ERC1155Receiver) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
