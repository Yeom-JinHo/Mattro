package com.carrot.mattro;

import com.carrot.mattro.DTO.OutputResponse;
import com.carrot.mattro.Repository.OutputRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MongoDBServiceImpl implements MongoDBService{

    private final OutputRepository outputR;
    private final Output invalidOutput = new Output();

    @Override
    public Optional<Output> findPlaceBySubwayName(String subwayName) {
        Optional<Output> output = Optional.ofNullable(outputR.findBy역명(subwayName));
        if(output.isPresent()){
            return output;
        }
        return null;
    }

    @Override
    public void findPlaceByUrl(String Url) {

    }

    @Override
    public void findPlaceListByChoiceList(String ChoiceList) {

    }

    @Override
    public void findPlaceListByUrl(String url) {

    }

    @Cacheable(value = "layoutCaching")
    @Override
    public Optional<Output> findPlaceByStoreIndex(String storeIndex) {
        long before_time = System.currentTimeMillis();
        Optional<Output> output = Optional.ofNullable(outputR.findByStoreIdx(storeIndex));
        if(output.isPresent()){
            long after_time = System.currentTimeMillis();
            System.out.println("시간 차 : "+ (after_time - before_time));
            return output;
        }
        else
            return null;
    }
}
